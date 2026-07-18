"use client";

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { useFirebase } from '@/firebase/provider';
import { initiateEmailSignUp, initiateEmailSignIn } from '@/firebase/non-blocking-login';

export function LoginModal() {
    const { setIsLoginOpen } = useApp();
    const { auth, user } = useFirebase();
    const [mode, setMode] = useState('login'); // login | register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;

        if (mode === 'login') {
            initiateEmailSignIn(auth, email, password);
        } else {
            initiateEmailSignUp(auth, email, password, name);
        }
    };

    useEffect(() => {
        if (user) {
            setIsLoginOpen(false);
        }
    }, [user, setIsLoginOpen]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setIsLoginOpen(false)}></div>
          <div className="bg-background w-full max-w-md p-8 rounded-2xl relative z-10 animate-fade-in-up shadow-2xl">
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20}/></button>
              
              <div className="text-center mb-8">
                  <h2 className="text-2xl font-black mb-2 font-headline">{mode === 'login' ? 'ACCESO MIEMBROS' : 'UNIRSE AL NÚCLEO'}</h2>
                  <p className="text-muted-foreground text-sm">Plataforma de gestión para artistas y colaboradores.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                  {mode === 'register' && (
                      <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Nombre Completo</label>
                          <div className="relative">
                              <User className="absolute left-3 top-3 text-muted-foreground" size={16}/>
                              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded focus:border-foreground outline-none" placeholder="Tu nombre" required />
                          </div>
                      </div>
                  )}
                  <div>
                      <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Correo Electrónico</label>
                      <div className="relative">
                          <Mail className="absolute left-3 top-3 text-muted-foreground" size={16}/>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded focus:border-foreground outline-none" placeholder="usuario@nucleo.com" required />
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Contraseña</label>
                      <div className="relative">
                          <Lock className="absolute left-3 top-3 text-muted-foreground" size={16}/>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded focus:border-foreground outline-none" placeholder="••••••••" required />
                      </div>
                  </div>

                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 font-bold uppercase tracking-wider hover:bg-foreground transition-colors rounded">
                      {mode === 'login' ? 'Ingresar' : 'Registrarse'}
                  </button>
              </form>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                  {mode === 'login' ? (
                      <p>¿No tienes cuenta? <button type="button" onClick={() => setMode('register')} className="font-bold text-foreground hover:underline">Solicitar Acceso</button></p>
                  ) : (
                      <p>¿Ya tienes cuenta? <button type="button" onClick={() => setMode('login')} className="font-bold text-foreground hover:underline">Iniciar Sesión</button></p>
                  )}
              </div>
          </div>
        </div>
    );
};
