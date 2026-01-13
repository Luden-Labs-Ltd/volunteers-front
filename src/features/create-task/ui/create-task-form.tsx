import { FC, useState } from 'react';
import { Button, Input } from '@/shared/ui';

export const CreateTaskForm: FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Опишите задачу" />
      <Button type="submit">Создать задачу</Button>
    </form>
  );
};
