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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      app_analytics: {
        Row: {
          active_users: number | null
          app_id: string
          crash_rate: number | null
          created_at: string
          date: string
          downloads: number | null
          id: string
          rating_average: number | null
          retention_rate: number | null
          revenue: number | null
          reviews_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_users?: number | null
          app_id: string
          crash_rate?: number | null
          created_at?: string
          date: string
          downloads?: number | null
          id?: string
          rating_average?: number | null
          retention_rate?: number | null
          revenue?: number | null
          reviews_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_users?: number | null
          app_id?: string
          crash_rate?: number | null
          created_at?: string
          date?: string
          downloads?: number | null
          id?: string
          rating_average?: number | null
          retention_rate?: number | null
          revenue?: number | null
          reviews_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_analytics_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      apps: {
        Row: {
          app_store_url: string | null
          category: string | null
          created_at: string
          description: string | null
          downloads: number | null
          icon_url: string | null
          id: string
          last_updated: string | null
          name: string
          package_name: string
          play_store_url: string | null
          rating: number | null
          rating_count: number | null
          size_mb: number | null
          status: string | null
          updated_at: string
          user_id: string
          version: string | null
          website_url: string | null
        }
        Insert: {
          app_store_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          downloads?: number | null
          icon_url?: string | null
          id?: string
          last_updated?: string | null
          name: string
          package_name: string
          play_store_url?: string | null
          rating?: number | null
          rating_count?: number | null
          size_mb?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
          version?: string | null
          website_url?: string | null
        }
        Update: {
          app_store_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          downloads?: number | null
          icon_url?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          package_name?: string
          play_store_url?: string | null
          rating?: number | null
          rating_count?: number | null
          size_mb?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
          version?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      keywords: {
        Row: {
          app_id: string | null
          app_package: string
          created_at: string
          id: string
          keyword: string
          lang: string | null
          rank: number | null
          region: string
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          app_id?: string | null
          app_package: string
          created_at?: string
          id?: string
          keyword: string
          lang?: string | null
          rank?: number | null
          region: string
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          app_id?: string | null
          app_package?: string
          created_at?: string
          id?: string
          keyword?: string
          lang?: string | null
          rank?: number | null
          region?: string
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keywords_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          display_name: string | null
          email: string | null
          email_verified: boolean | null
          first_name: string | null
          id: string
          language: string | null
          last_login_at: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          phone: string | null
          subscription_expires_at: string | null
          subscription_plan: string | null
          timezone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id: string
          language?: string | null
          last_login_at?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id?: string
          language?: string | null
          last_login_at?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_refresh_interval: number | null
          created_at: string
          data_retention_days: number | null
          default_language: string | null
          default_region: string | null
          email_notifications: boolean | null
          id: string
          notifications_enabled: boolean | null
          push_notifications: boolean | null
          theme: string | null
          updated_at: string
          user_id: string
          weekly_reports: boolean | null
        }
        Insert: {
          auto_refresh_interval?: number | null
          created_at?: string
          data_retention_days?: number | null
          default_language?: string | null
          default_region?: string | null
          email_notifications?: boolean | null
          id?: string
          notifications_enabled?: boolean | null
          push_notifications?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id: string
          weekly_reports?: boolean | null
        }
        Update: {
          auto_refresh_interval?: number | null
          created_at?: string
          data_retention_days?: number | null
          default_language?: string | null
          default_region?: string | null
          email_notifications?: boolean | null
          id?: string
          notifications_enabled?: boolean | null
          push_notifications?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id?: string
          weekly_reports?: boolean | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
