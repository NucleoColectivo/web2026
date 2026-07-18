'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type Video = {
  id: string;
  titulo: string;
  canal: string;
  url: string;
  descripcion: string;
};

interface VideoPlayerModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  if (!video) return null;

  const videoId = new URL(video.url).searchParams.get('v');
  if (!videoId) return null;
  
  return (
    <Dialog open={!!video} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-4xl p-0">
        <DialogTitle className="sr-only">{video.titulo}</DialogTitle>
        <DialogDescription className="sr-only">{video.descripcion}</DialogDescription>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-t-lg"
          ></iframe>
        </div>
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold font-headline mb-2">{video.titulo}</h2>
            <div className="text-neutral-400 space-y-4">
              <p className="text-sm">{video.descripcion}</p>
              <span className="text-xs font-code bg-neutral-800 px-2 py-1 rounded">Canal: {video.canal}</span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
