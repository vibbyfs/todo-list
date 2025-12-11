import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.client = new OpenAI({ apiKey });
  }

  async recomendProblemDesc(problemDesc: string): Promise<string> {
    try {
      const response = await this.client.responses.create({
        model: 'gpt-5',
        instructions:
          'Kamu adalah asisten teknis yang memberi saran singkat, praktis, dan spesifik untuk menyelesaikan masalah pada sebuah todo. Jawab dalam Bahasa Indonesia dan maksimal 3 poin pendek.',
        input: `Todo ini memiliki problem: "${problemDesc}". Berikan rekomendasi langkah perbaikan yang realistis dan actionable.`,
      });
      return response.output_text ?? 'Nothing recomendation form AI';
    } catch (err) {
      this.logger.error('Failed to get AI recomendation', err);
      return 'Failed to get AI recomendation';
    }
  }
}
