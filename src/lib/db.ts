import { createClient } from "@supabase/supabase-js";

// SuperCool managed database (public url + anon key).
const url = "https://prj75ce0e3f68f790badcc7.databasepad.com";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlmODZmMWRhLWU5M2YtNDRmMS04ZGRjLWI5ZGUzYTE1MGYyNyJ9.eyJwcm9qZWN0SWQiOiJwcmo3NWNlMGUzZjY4Zjc5MGJhZGNjNyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg1ODM4NTA1LCJleHAiOjIxMDExOTg1MDUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.Q2Sr4h9JyzvyUu_6mYz-fzsDp6IFUxqhqfVjBFMP8aE";

export const db = createClient(url, anonKey);
export default db;
