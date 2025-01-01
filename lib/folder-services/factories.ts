import { JsonLhExtractor } from "./interfaces"
import { supabaseService } from "./supabase.service"

export const jsonLhExtractorFactory: JsonLhExtractor = supabaseService
