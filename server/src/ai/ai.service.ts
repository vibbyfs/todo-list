import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }
    this.client = new OpenAI({ apiKey });
  }

  async recomendProblemDesc(problemDesc: string): Promise<string> {
    try {
      const response = await this.client.responses.create({
        model: 'gpt-5',
        instructions:
          'You are a technical assistant that provides brief, practical, and specific advice to solve problems on a todo item. Respond in the same language as the user input and a maximum of 3 short points.',
        input: `This Todo has a problem: "${problemDesc}". Provide realistic and actionable recommended steps for improvement.`,
      });
      return response.output_text ?? 'Nothing recomendation form AI';
    } catch (err) {
      this.logger.error('Failed to get AI recomendation', err);
      return 'Failed to get AI recomendation';
    }
  }
}
