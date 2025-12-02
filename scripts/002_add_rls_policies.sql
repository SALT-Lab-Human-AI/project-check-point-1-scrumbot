-- Add RLS policies to allow public read/write for team setup data
-- Run this script AFTER 001_create_team_data_tables.sql

-- Team Members - Allow all operations
CREATE POLICY "Allow public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert team_members" ON team_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update team_members" ON team_members FOR UPDATE USING (true);
CREATE POLICY "Allow public delete team_members" ON team_members FOR DELETE USING (true);

-- Skills - Allow all operations
CREATE POLICY "Allow public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert skills" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update skills" ON skills FOR UPDATE USING (true);
CREATE POLICY "Allow public delete skills" ON skills FOR DELETE USING (true);

-- Member Skills - Allow all operations
CREATE POLICY "Allow public read member_skills" ON member_skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert member_skills" ON member_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update member_skills" ON member_skills FOR UPDATE USING (true);
CREATE POLICY "Allow public delete member_skills" ON member_skills FOR DELETE USING (true);

-- Sprints - Allow all operations
CREATE POLICY "Allow public read sprints" ON sprints FOR SELECT USING (true);
CREATE POLICY "Allow public insert sprints" ON sprints FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update sprints" ON sprints FOR UPDATE USING (true);
CREATE POLICY "Allow public delete sprints" ON sprints FOR DELETE USING (true);

-- Member Capacity - Allow all operations
CREATE POLICY "Allow public read member_capacity" ON member_capacity FOR SELECT USING (true);
CREATE POLICY "Allow public insert member_capacity" ON member_capacity FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update member_capacity" ON member_capacity FOR UPDATE USING (true);
CREATE POLICY "Allow public delete member_capacity" ON member_capacity FOR DELETE USING (true);

-- Member Preferences - Allow all operations
CREATE POLICY "Allow public read member_preferences" ON member_preferences FOR SELECT USING (true);
CREATE POLICY "Allow public insert member_preferences" ON member_preferences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update member_preferences" ON member_preferences FOR UPDATE USING (true);
CREATE POLICY "Allow public delete member_preferences" ON member_preferences FOR DELETE USING (true);

-- Stories - Allow all operations
CREATE POLICY "Allow public read stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Allow public insert stories" ON stories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update stories" ON stories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete stories" ON stories FOR DELETE USING (true);

-- Story History - Allow all operations
CREATE POLICY "Allow public read story_history" ON story_history FOR SELECT USING (true);
CREATE POLICY "Allow public insert story_history" ON story_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update story_history" ON story_history FOR UPDATE USING (true);
CREATE POLICY "Allow public delete story_history" ON story_history FOR DELETE USING (true);

-- Transcripts - Allow all operations
CREATE POLICY "Allow public read transcripts" ON transcripts FOR SELECT USING (true);
CREATE POLICY "Allow public insert transcripts" ON transcripts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update transcripts" ON transcripts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete transcripts" ON transcripts FOR DELETE USING (true);

-- CSV Upload Metadata - Allow all operations
CREATE POLICY "Allow public read csv_upload_metadata" ON csv_upload_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public insert csv_upload_metadata" ON csv_upload_metadata FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update csv_upload_metadata" ON csv_upload_metadata FOR UPDATE USING (true);
CREATE POLICY "Allow public delete csv_upload_metadata" ON csv_upload_metadata FOR DELETE USING (true);
