import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

import { LearningTypeResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "8비트 게임 테마의 학습 유형 제목. (예: 'ISTJ - 마스터 아키비스트')",
        },
        description: {
            type: Type.STRING,
            description: "해당 학습 유형의 특징과 성격에 대한 상세한 설명.",
        },
        strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "학습자로서 가지는 강점 목록.",
        },
        strategies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "해당 유형에 가장 효과적인 추천 학습 전략 목록.",
        },
    },
    required: ["title", "description", "strengths", "strategies"],
};


export const fetchLearningStyle = async (mbtiType: string): Promise<LearningTypeResult> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `학생의 학습 성향 진단 결과가 MBTI 유형 '${mbtiType}'으로 나왔습니다. 이 유형에 맞춰 8비트 레트로 게임 컨셉의 학습 페르소나를 만들어주세요.`,
            config: {
                systemInstruction: "당신은 MBTI를 기반으로 학생들의 학습 유형을 분석하고, 8비트 게임 테마에 맞춰 재미있고 유용한 조언을 제공하는 전문가입니다. 결과는 반드시 JSON 형식으로, 정의된 스키마에 맞춰 생성해야 합니다.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation
        if (
            !parsedData.title ||
            !parsedData.description ||
            !Array.isArray(parsedData.strengths) ||
            !Array.isArray(parsedData.strategies)
        ) {
            throw new Error("Received malformed data from API");
        }

        return parsedData as LearningTypeResult;

    } catch (error) {
        console.error("Error fetching learning style from Gemini API:", error);
        throw new Error("Failed to get learning style data from Gemini API.");
    }
};

export const fetchFollowUpAnswer = async (
  mbtiType: string,
  learningStyle: LearningTypeResult,
  question: string
): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `사용자의 MBTI 유형은 '${mbtiType}'이고, 학습 페르소나는 '${learningStyle.title}'입니다. 이 페르소나에 대한 설명은 다음과 같습니다: "${learningStyle.description}". 이 사용자가 다음과 같은 추가 질문을 했습니다: "${question}". 8비트 게임 컨셉의 전문가 페르소나를 유지하면서, 이 질문에 대해 친절하고 명확하게 답변해주세요. 답변은 한두 문단으로 간결하게 작성해주세요.`,
      config: {
        systemInstruction: "당신은 MBTI를 기반으로 학생들의 학습 유형을 분석하고, 8비트 게임 테마에 맞춰 재미있고 유용한 조언을 제공하는 전문가입니다.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching follow-up answer from Gemini API:", error);
    throw new Error("Failed to get follow-up answer from Gemini API.");
  }
};
