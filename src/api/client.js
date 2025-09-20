// Independent API Client - Completely standalone

class APIClient {
    constructor(options = {}) {
        this.apiKey = options.apiKey;
        this.openaiApiKey = options.openaiApiKey;
        this.sendgridApiKey = options.sendgridApiKey;
        this.requiresAuth = options.requiresAuth || false;
        this.accessToken = null;

        // Initialize integrations
        this.integrations = {
            Core: this.createCoreIntegrations()
        };
    }

    // Authentication methods
    isAuthenticated() {
        return !!(this.accessToken || this.apiKey || this.openaiApiKey);
    }

    getAccessToken() {
        return this.accessToken || this.apiKey || this.openaiApiKey;
    }

    setAccessToken(token) {
        this.accessToken = token;
    }

    // Create Core integrations object
    createCoreIntegrations() {
        return {
            InvokeLLM: this.createInvokeLLM(),
            SendEmail: this.createSendEmail(),
            UploadFile: this.createUploadFile(),
            GenerateImage: this.createGenerateImage(),
            ExtractDataFromUploadedFile: this.createExtractDataFromUploadedFile(),
            CreateFileSignedUrl: this.createFileSignedUrl(),
            UploadPrivateFile: this.createUploadPrivateFile()
        };
    }

    // LLM Integration (OpenAI)
    createInvokeLLM() {
        return async (options = {}) => {
            const {
                model = 'gpt-3.5-turbo',
                messages = [],
                temperature = 0.7,
                maxTokens = 1000,
                apiKey = this.openaiApiKey || this.apiKey,
                baseUrl = 'https://api.openai.com/v1'
            } = options;

            if (!apiKey) {
                throw new Error('OpenAI API key is required for LLM operations');
            }

            try {
                const response = await fetch(`${baseUrl}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model,
                        messages,
                        temperature,
                        max_tokens: maxTokens
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error invoking LLM:', error);
                throw error;
            }
        };
    }

    // Email Integration (SendGrid)
    createSendEmail() {
        return async (options = {}) => {
            const {
                to,
                from,
                subject,
                text,
                html,
                apiKey = this.sendgridApiKey || this.apiKey
            } = options;

            if (!apiKey) {
                throw new Error('SendGrid API key is required for email operations');
            }

            if (!to || !from || !subject) {
                throw new Error('Missing required email parameters: to, from, subject');
            }

            try {
                const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        personalizations: [{
                            to: [{ email: to }]
                        }],
                        from: { email: from },
                        subject,
                        content: [
                            ...(text ? [{ type: 'text/plain', value: text }] : []),
                            ...(html ? [{ type: 'text/html', value: html }] : [])
                        ]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(`SendGrid API error: ${response.status} - ${errorData}`);
                }

                return {
                    success: true,
                    messageId: response.headers.get('x-message-id'),
                    status: 'sent'
                };
            } catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
        };
    }

    // Image Generation (OpenAI DALL-E)
    createGenerateImage() {
        return async (options = {}) => {
            const {
                prompt,
                size = '1024x1024',
                model = 'dall-e-3',
                quality = 'standard',
                n = 1,
                apiKey = this.openaiApiKey || this.apiKey,
                baseUrl = 'https://api.openai.com/v1'
            } = options;

            if (!apiKey) {
                throw new Error('OpenAI API key is required for image generation');
            }

            if (!prompt) {
                throw new Error('Prompt is required for image generation');
            }

            try {
                const response = await fetch(`${baseUrl}/images/generations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model,
                        prompt,
                        size,
                        quality,
                        n
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`OpenAI Images API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error generating image:', error);
                throw error;
            }
        };
    }

    // File Upload (Generic implementation)
    createUploadFile() {
        return async (options = {}) => {
            const {
                file,
                uploadUrl = '/api/upload',
                additionalFields = {}
            } = options;

            if (!file) {
                throw new Error('File is required for upload');
            }

            try {
                const formData = new FormData();
                formData.append('file', file);

                // Add any additional fields
                Object.keys(additionalFields).forEach(key => {
                    formData.append(key, additionalFields[key]);
                });

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.getAccessToken()}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Upload error: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('File upload error:', error);
                throw error;
            }
        };
    }

    // Extract Data from File (Generic implementation)
    createExtractDataFromUploadedFile() {
        return async (options = {}) => {
            const {
                fileUrl,
                filePath,
                extractionType = 'text',
                apiEndpoint = '/api/extract-data'
            } = options;

            if (!fileUrl && !filePath) {
                throw new Error('Either fileUrl or filePath is required');
            }

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.getAccessToken()}`
                    },
                    body: JSON.stringify({
                        fileUrl,
                        filePath,
                        extractionType
                    })
                });

                if (!response.ok) {
                    throw new Error(`Data extraction error: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error extracting data from file:', error);
                throw error;
            }
        };
    }

    // Create File Signed URL (Generic implementation)
    createFileSignedUrl() {
        return async (options = {}) => {
            const {
                bucket,
                key,
                expiresIn = 3600,
                method = 'GET',
                service = 's3',
                apiEndpoint = '/api/signed-url'
            } = options;

            if (!bucket || !key) {
                throw new Error('Bucket and key are required for signed URL creation');
            }

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.getAccessToken()}`
                    },
                    body: JSON.stringify({
                        bucket,
                        key,
                        expiresIn,
                        method,
                        service
                    })
                });

                if (!response.ok) {
                    throw new Error(`Signed URL creation error: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error creating signed URL:', error);
                throw error;
            }
        };
    }

    // Upload Private File (Generic implementation)
    createUploadPrivateFile() {
        return async (options = {}) => {
            const {
                file,
                bucket,
                key,
                encryption = true,
                accessLevel = 'private',
                uploadUrl = '/api/upload-private'
            } = options;

            if (!file) {
                throw new Error('File is required for private upload');
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                if (bucket) formData.append('bucket', bucket);
                if (key) formData.append('key', key);
                formData.append('accessLevel', accessLevel);
                formData.append('encryption', encryption.toString());

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.getAccessToken()}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Private upload error: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error('Error uploading private file:', error);
                throw error;
            }
        };
    }

    // Utility methods
    updateConfig(newConfig) {
        Object.assign(this, newConfig);
    }

    logout() {
        this.accessToken = null;
    }
}

// Factory function to create client
export function createClient(options = {}) {
    return new APIClient(options);
}

// Create the default client instance
export const client = createClient({
    requiresAuth: false
});

// Named exports for individual functions
export const Core = client.integrations.Core;
export const InvokeLLM = client.integrations.Core.InvokeLLM;
export const SendEmail = client.integrations.Core.SendEmail;
export const UploadFile = client.integrations.Core.UploadFile;
export const GenerateImage = client.integrations.Core.GenerateImage;
export const ExtractDataFromUploadedFile = client.integrations.Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = client.integrations.Core.CreateFileSignedUrl;
export const UploadPrivateFile = client.integrations.Core.UploadPrivateFile;

// Utility exports
export const getAccessToken = () => client.getAccessToken();
export const isAuthenticated = () => client.isAuthenticated();
export const setAccessToken = (token) => client.setAccessToken(token);