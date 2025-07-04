# **App Name**: Codex Assistant

## Core Features:

- Medical Coding Interpretation: Interpret user input (ICD-10 code or diagnostic phrase) using a LLM tool, and return structured medical coding information as a JSON object.
- Information Display: Display the structured JSON information (code_id, description, category, applicable_settings, diagnostic_criteria, MEAT_compliance_recommendations) in a readable format.
- User Input: Provide a user input field to enter the ICD-10 code or diagnostic phrase.
- Prompt Configuration: Store and manage prompt configurations in Firebase (Firestore) including instructions and example input/output for maintainability.
- LLM Interaction: Fetch prompts from Firebase and build a final prompt string that is sent to the LLM. Capture user input and pass to the OpenAI/Anthropic model.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) for a professional and trustworthy feel, aligning with the clinical context.
- Background color: Light Gray (#F5F5F5) to provide a clean and neutral backdrop, ensuring readability and reducing eye strain.
- Accent color: Teal (#009688) for interactive elements and important highlights, offering a touch of modernity.
- Body and headline font: 'Inter', sans-serif, to maintain clarity and modern readability.
- Code Font: 'Source Code Pro', monospaced, will be used if code examples are included in display.
- Use minimalistic icons to represent categories like 'Diagnosis', 'Treatment', and 'Monitoring'.
- Maintain a clean, organized layout with clear sections for input, interpretation, and additional details.