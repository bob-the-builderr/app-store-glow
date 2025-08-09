-- Create apps table to store user applications
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  package_name TEXT NOT NULL,
  icon_url TEXT,
  description TEXT,
  category TEXT,
  status TEXT DEFAULT 'active',
  app_store_url TEXT,
  play_store_url TEXT,
  website_url TEXT,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  rating_count INTEGER DEFAULT 0,
  version TEXT,
  size_mb INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Add constraint for unique app per user
  UNIQUE(user_id, package_name)
);

-- Enable RLS on apps table
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for apps table
CREATE POLICY "Users can view their own apps" 
ON public.apps 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own apps" 
ON public.apps 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own apps" 
ON public.apps 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own apps" 
ON public.apps 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates on apps
CREATE TRIGGER update_apps_updated_at
BEFORE UPDATE ON public.apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add foreign key reference from keywords to apps
ALTER TABLE public.keywords 
ADD COLUMN app_id UUID REFERENCES public.apps(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX idx_apps_user_id ON public.apps(user_id);
CREATE INDEX idx_apps_package_name ON public.apps(package_name);
CREATE INDEX idx_keywords_app_id ON public.keywords(app_id);

-- Enhance profiles table with more user data
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN company TEXT,
ADD COLUMN website TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN timezone TEXT DEFAULT 'UTC',
ADD COLUMN language TEXT DEFAULT 'en',
ADD COLUMN subscription_plan TEXT DEFAULT 'free',
ADD COLUMN subscription_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN email_verified BOOLEAN DEFAULT false,
ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;

-- Create user_settings table for app preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  theme TEXT DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  weekly_reports BOOLEAN DEFAULT true,
  data_retention_days INTEGER DEFAULT 365,
  auto_refresh_interval INTEGER DEFAULT 300, -- seconds
  default_region TEXT DEFAULT 'US',
  default_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_settings table
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_settings table
CREATE POLICY "Users can view their own settings" 
ON public.user_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own settings" 
ON public.user_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
ON public.user_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates on user_settings
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create app_analytics table for tracking app performance
CREATE TABLE public.app_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  downloads INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  retention_rate DECIMAL(5,2),
  crash_rate DECIMAL(5,2),
  rating_average DECIMAL(2,1),
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Unique constraint to prevent duplicate entries per app per date
  UNIQUE(app_id, date)
);

-- Enable RLS on app_analytics table
ALTER TABLE public.app_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for app_analytics table
CREATE POLICY "Users can view their own app analytics" 
ON public.app_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own app analytics" 
ON public.app_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own app analytics" 
ON public.app_analytics 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own app analytics" 
ON public.app_analytics 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates on app_analytics
CREATE TRIGGER update_app_analytics_updated_at
BEFORE UPDATE ON public.app_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_app_analytics_app_id ON public.app_analytics(app_id);
CREATE INDEX idx_app_analytics_date ON public.app_analytics(date);
CREATE INDEX idx_app_analytics_user_id ON public.app_analytics(user_id);