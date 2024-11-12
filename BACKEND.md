# Prompt Professor - Backend Implementation Guide

## Tech Stack Recommendations

### Core Stack
- **Framework**: NestJS
  - Type-safe, modular architecture
  - Built-in OpenAPI support
  - Easy integration with various ORMs and services
  - Excellent dependency injection system

- **Database**: Supabase (PostgreSQL)
  - Serverless PostgreSQL database
  - Built-in authentication
  - Real-time capabilities
  - Row Level Security (RLS) for data protection
  - Easy deployment and scaling

- **Caching**: Redis
  - Cache frequently used prompts
  - Rate limiting
  - Session management

### API Integration
- **OpenAI API** for prompt enhancement
- **Claude API** (optional) for alternative AI model

## API Structure

```typescript
// Core types
interface PromptRequest {
  input: string;
  style: 'persuasive' | 'informative' | 'narrative' | 'technical';
  expertise: 'marketing' | 'teaching' | 'creative' | 'technical';
  userId?: string; // Optional, for authenticated users
}

interface PromptResponse {
  enhancedPrompt: string;
  metadata: {
    tokensUsed: number;
    model: string;
    timestamp: string;
  };
}

// Error handling
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

## System Architecture

```mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Rate Limiter]
    C --> D[Prompt Service]
    D --> E[Cache Layer]
    D --> F[AI Service]
    D --> G[Database]
    F --> H[OpenAI]
    F --> I[Claude]
```

## Implementation Priority

1. **Phase 1: Core Functionality**
   ```typescript
   // prompt.service.ts
   @Injectable()
   export class PromptService {
     constructor(
       private readonly aiService: AIService,
       private readonly cacheService: CacheService,
     ) {}

     async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
       const cacheKey = this.generateCacheKey(request);
       const cached = await this.cacheService.get(cacheKey);
       
       if (cached) {
         return cached;
       }

       const systemPrompt = this.buildSystemPrompt(request);
       const enhanced = await this.aiService.generate(systemPrompt, request);
       
       await this.cacheService.set(cacheKey, enhanced);
       return enhanced;
     }
   }
   ```

2. **Phase 2: Authentication & History**
   ```typescript
   // user.entity.ts
   @Entity()
   export class User {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column({ unique: true })
     email: string;

     @OneToMany(() => Prompt, prompt => prompt.user)
     prompts: Prompt[];
   }
   ```

3. **Phase 3: Analytics & Optimization**

## System Prompt Engineering

The system prompt for the AI service should follow this structure:

```typescript
const systemPrompt = `You are an expert prompt engineer with the following characteristics:
- Expertise in ${request.expertise}
- Specialization in ${request.style} communication
- Focus on clarity and actionable outcomes

Your task is to enhance the following prompt while maintaining:
1. Original intent and context
2. Professional tone
3. Clear success criteria
4. Specific constraints or requirements

Original prompt: "${request.input}"

Generate an enhanced version that:
- Maintains brevity (max 2000 characters)
- Includes clear context
- Specifies desired outcome
- Adds relevant constraints
- Preserves original meaning`;
```

## Performance Considerations

1. **Caching Strategy**
   ```typescript
   // cache.service.ts
   @Injectable()
   export class CacheService {
     constructor(
       @Inject(REDIS) private readonly redis: Redis,
     ) {}

     async get(key: string): Promise<PromptResponse | null> {
       const cached = await this.redis.get(key);
       return cached ? JSON.parse(cached) : null;
     }

     async set(
       key: string, 
       value: PromptResponse, 
       ttl: number = 3600
     ): Promise<void> {
       await this.redis.set(
         key, 
         JSON.stringify(value), 
         'EX', 
         ttl
       );
     }
   }
   ```

2. **Rate Limiting**
   ```typescript
   // rate-limit.guard.ts
   @Injectable()
   export class RateLimitGuard implements CanActivate {
     async canActivate(context: ExecutionContext): Promise<boolean> {
       const request = context.switchToHttp().getRequest();
       const key = `ratelimit:${request.ip}`;
       
       // Allow 60 requests per minute
       return this.rateLimiterService.checkLimit(key, 60, 60);
     }
   }
   ```

## Environment Configuration

```env
# API Configuration
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/prompt_professor

# Redis
REDIS_URL=redis://localhost:6379

# AI Services
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-...

# Security
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=24h

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=60
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start development server:
   ```bash
   npm run start:dev
   ```

## Testing Strategy

1. **Unit Tests**
   ```typescript
   // prompt.service.spec.ts
   describe('PromptService', () => {
     it('should enhance prompt while maintaining original intent', async () => {
       const result = await service.enhancePrompt({
         input: 'Write a marketing email',
         style: 'persuasive',
         expertise: 'marketing'
       });
       
       expect(result.enhancedPrompt).toContain('marketing');
       expect(result.metadata.tokensUsed).toBeDefined();
     });
   });
   ```

2. **Integration Tests**
3. **Load Tests**

## Monitoring & Logging

- Use Winston for logging
- Implement Prometheus metrics
- Set up Grafana dashboards

## Security Checklist

- [ ] Implement rate limiting
- [ ] Set up JWT authentication
- [ ] Enable CORS protection
- [ ] Add request validation
- [ ] Implement API key rotation
- [ ] Set up audit logging