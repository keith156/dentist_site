
// Add React import to resolve React namespace for React.ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}