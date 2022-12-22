import { Injectable } from '@angular/core';
import {AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _supabase: SupabaseClient;
  private _authSession: AuthSession | null = null;

  constructor() {
    this._supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this._supabase.auth.getSession().then(({data}: { data: { session: Session | null}} ) => {
      this._authSession = data.session;
    })
  }

  get session(): AuthSession | null {
    return this._authSession;
  }

  profile(user: User) {
    return this._supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this._supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this._supabase.auth.signInWithOtp({ email })
  }

  signOut() {
    return this._supabase.auth.signOut()
  }
}
