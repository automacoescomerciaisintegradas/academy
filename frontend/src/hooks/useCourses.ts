'use client';

import { useState, useEffect } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  lessons: number;
  students: number;
  instructor: string;
  duration: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  badge?: string;
  classes?: Array<{
    id: string;
    name: string;
    startDate: string;
    price: number;
    status: string;
  }>;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/courses-data.json');
        if (!response.ok) throw new Error('Falha ao carregar cursos');

        const data = await response.json();
        setCourses(data.courses || []);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        console.error('Erro ao carregar cursos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const getCoursesByLevel = (level: string) => {
    return courses.filter(course => course.level === level);
  };

  return { courses, loading, error, getCourseById, getCoursesByLevel };
};
