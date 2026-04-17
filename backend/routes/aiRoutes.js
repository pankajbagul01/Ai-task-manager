const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Task = require('../models/Task');

router.post('/parse', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ message: 'Gemini API Key is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPrompt = `You are a task manager assistant. Extract task details from the user's message and return ONLY raw JSON in this exact format, no markdown:
{
  "title": "short task title",
  "description": "additional details or empty string",
  "priority": "low" or "medium" or "high",
  "dueDate": "ISO 8601 date string or null"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt
      },
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    // Safely extract text
    let jsonString = response.candidates[0].content.parts[0].text;

    // Strip markdown fences if Gemini adds them anyway
    jsonString = jsonString.replace(/```json|```/g, '').trim();

    const taskData = JSON.parse(jsonString);

    const newTask = new Task({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined
    });

    const savedTask = await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: savedTask });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({ message: 'Failed to process AI prompt', error: error.message });
  }
});

module.exports = router;
