const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const Task = require('../models/Task');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/parse', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ 
        message: 'Gemini API Key is not configured. Please add it to your .env file.',
        warning: true
      });
    }

    const systemPrompt = `You are a helpful task manager assistant. A user will give you a natural language prompt. 
    Your goal is to extract the task details and return them strictly in the following JSON format:
    {
      "title": "A short concise title for the task",
      "description": "Any additional details or context (leave empty string if none)",
      "priority": "low" | "medium" | "high" (infer this from the prompt, default to medium),
      "dueDate": "ISO 8601 formatted date if mentioned, else null"
    }
    
    If you cannot determine a field, return the default. Do NOT wrap the JSON in Markdown formatting like \`\`\`json. Just return raw JSON text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    let jsonString = response.text;
    // Clean up markdown wrapping if the LLM ignores instructions
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const taskData = JSON.parse(jsonString);

    // Save the parsed data as a new task
    const newTask = new Task({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined
    });

    const savedTask = await newTask.save();
    
    res.status(201).json({
      message: 'Task generated successfully',
      task: savedTask
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({ message: 'Failed to process AI prompt', error: error.message });
  }
});

module.exports = router;
