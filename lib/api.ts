export interface InternshipRecommendation {
  Role: string;
  'Company Name': string;
  Location_clean: string;
  Stipend: string;
  Duration: string;
  Skills_text: string;
  Match_Score: number;
  Match_Percentage: number;
}

export interface RecommendationRequest {
  skills: string;
  location?: string;
  duration?: number;
  stipend?: number;
  top_k?: number;
}

export interface RecommendationResponse {
  success: boolean;
  recommendations: InternshipRecommendation[];
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getRecommendations(
  data: RecommendationRequest
): Promise<RecommendationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}