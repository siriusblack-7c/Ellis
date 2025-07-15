export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      care_bookings: {
        Row: {
          care_recipient_id: string
          caregiver_id: string | null
          client_id: string
          created_at: string
          end_date: string | null
          hourly_rate: number | null
          id: string
          schedule_details: Json
          special_instructions: string | null
          start_date: string
          status: string
          total_hours: number | null
          updated_at: string
        }
        Insert: {
          care_recipient_id: string
          caregiver_id?: string | null
          client_id: string
          created_at?: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          schedule_details: Json
          special_instructions?: string | null
          start_date: string
          status?: string
          total_hours?: number | null
          updated_at?: string
        }
        Update: {
          care_recipient_id?: string
          caregiver_id?: string | null
          client_id?: string
          created_at?: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          schedule_details?: Json
          special_instructions?: string | null
          start_date?: string
          status?: string
          total_hours?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_bookings_care_recipient_id_fkey"
            columns: ["care_recipient_id"]
            isOneToOne: false
            referencedRelation: "care_recipients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_bookings_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_recipients: {
        Row: {
          age: number
          care_needs: Database["public"]["Enums"]["care_need"][]
          client_id: string
          created_at: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          location: string
          name: string
          special_requirements: string | null
          updated_at: string
        }
        Insert: {
          age: number
          care_needs: Database["public"]["Enums"]["care_need"][]
          client_id: string
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          location: string
          name: string
          special_requirements?: string | null
          updated_at?: string
        }
        Update: {
          age?: number
          care_needs?: Database["public"]["Enums"]["care_need"][]
          client_id?: string
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          location?: string
          name?: string
          special_requirements?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_recipients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_applications: {
        Row: {
          admin_notes: string | null
          certification_files_urls: string[] | null
          certifications: string[] | null
          cover_letter_url: string | null
          created_at: string
          cv_url: string | null
          id: string
          preferred_work_location: string
          specialties: string[] | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
          video_interview_url: string | null
          years_experience: number
        }
        Insert: {
          admin_notes?: string | null
          certification_files_urls?: string[] | null
          certifications?: string[] | null
          cover_letter_url?: string | null
          created_at?: string
          cv_url?: string | null
          id?: string
          preferred_work_location: string
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
          video_interview_url?: string | null
          years_experience: number
        }
        Update: {
          admin_notes?: string | null
          certification_files_urls?: string[] | null
          certifications?: string[] | null
          cover_letter_url?: string | null
          created_at?: string
          cv_url?: string | null
          id?: string
          preferred_work_location?: string
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
          video_interview_url?: string | null
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string
          user_id: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "pending"
        | "under_review"
        | "interview"
        | "training"
        | "internship"
        | "hired"
        | "rejected"
      care_need:
        | "personal_care"
        | "companionship"
        | "meal_preparation"
        | "medication_management"
        | "mobility_assistance"
        | "dementia_care"
        | "post_surgery_care"
        | "chronic_condition_care"
      user_type: "client" | "caregiver" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "pending",
        "under_review",
        "interview",
        "training",
        "internship",
        "hired",
        "rejected",
      ],
      care_need: [
        "personal_care",
        "companionship",
        "meal_preparation",
        "medication_management",
        "mobility_assistance",
        "dementia_care",
        "post_surgery_care",
        "chronic_condition_care",
      ],
      user_type: ["client", "caregiver", "admin"],
    },
  },
} as const
