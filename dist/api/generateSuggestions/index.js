var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });
export default function generateSuggestion(Chatcontext) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const response = yield ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `You are an employee and working as a chat support agent 
    and the customers talks to you over their issue ,you need to suggest as a company employee what else you can ask them in the given context ${Chatcontext} ,give two three suggestion over this topic${Chatcontext} and keep the suggestions of 4-5 words ONLY ,so that it feels easy for the user to get the suggestions and apply it
     and retunr the output in json format like this only one object with one key  with three values in it
    {suggestions:[suggestion1,suggestion2,suggestion2]} ,make sure the output follows the given format only !`,
        });
        //   console.log(response.text);
        const SplitResponse = (_a = response.text) === null || _a === void 0 ? void 0 : _a.split("`");
        if (!SplitResponse) {
            return { suggestions: [] };
        }
        const getSuggestions = (_b = SplitResponse[3]) === null || _b === void 0 ? void 0 : _b.split("json");
        if (!getSuggestions || !getSuggestions[1]) {
            return { suggestions: [] };
        }
        const getParsedSuggestions = JSON.parse(getSuggestions[1]);
        console.log(getParsedSuggestions);
        return getParsedSuggestions;
    });
}
