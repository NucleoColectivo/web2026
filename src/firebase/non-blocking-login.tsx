'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance)
    .catch(error => {
      console.error("Anonymous sign-in error", error);
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message,
      });
    });
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, name: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then(userCredential => {
      if (userCredential.user) {
        return updateProfile(userCredential.user, { displayName: name });
      }
    })
    .catch(error => {
      console.error("Sign-up error", error);
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: error.message,
      });
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .catch(error => {
      console.error("Sign-in error", error);
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message,
      });
    });
}
