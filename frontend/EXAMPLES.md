# 📚 Exemplos de Integração - Sistema de Notificações

## Usando NotificationAPI em Componentes

### Exemplo 1: Form de Login com Notificações

```tsx
'use client';

import { useRouter } from 'next/navigation';
import PremiumButton from '@/components/ui/PremiumButton';
import { useNotification } from '@/hooks/useNotification';

export default function LoginPage() {
  const router = useRouter();
  const notify = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        notify.success('Bem-vindo!', 'Você entrou com sucesso', {
          action: {
            label: 'Ir para Dashboard',
            onClick: () => router.push('/dashboard'),
          },
        });
      } else {
        const error = await response.json();
        notify.error('Erro de Login', error.message || 'Credenciais inválidas');
      }
    } catch (error) {
      notify.error('Erro', error instanceof Error ? error.message : 'Algo deu errado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }}>
      {/* form fields */}
      <PremiumButton type="submit" isLoading={isLoading}>
        Entrar
      </PremiumButton>
    </form>
  );
}
```

### Exemplo 2: Upload de Arquivo com Feedback

```tsx
'use client';

import { useNotification } from '@/hooks/useNotification';

export default function UploadCourseModule() {
  const notify = useNotification();

  const handleUpload = async (file: File) => {
    // Validar arquivo
    if (file.size > 100 * 1024 * 1024) {
      notify.warning('Arquivo Grande', 'O arquivo não pode exceder 100MB');
      return;
    }

    const notifId = notify.info('Upload', 'Enviando arquivo...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        notify.success(
          'Upload Concluído!',
          `${file.name} foi enviado com sucesso`,
          {
            action: {
              label: 'Abrir Módulo',
              onClick: () => {/* navigate */}
            },
          }
        );
      } else {
        notify.error('Erro no Upload', 'Não foi possível enviar o arquivo');
      }
    } catch (error) {
      notify.error('Erro', 'Falha na conexão ao servidor');
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
      />
    </div>
  );
}
```

### Exemplo 3: CRUD de Cursos com Notificações

```tsx
'use client';

import { useNotification } from '@/hooks/useNotification';
import PremiumButton from '@/components/ui/PremiumButton';

interface Course {
  id: string;
  title: string;
  description: string;
}

export default function CourseManager() {
  const notify = useNotification();

  const handleCreateCourse = async (courseData: Omit<Course, 'id'>) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const newCourse = await response.json();

      notify.success('Curso Criado!', `"${newCourse.title}" foi criado`, {
        action: {
          label: 'Editar',
          onClick: () => {/* navigate to edit */}
        },
      });
    } catch (_) {
      notify.error('Erro ao criar', 'O curso não pôde ser criado');
    }
  };

  const handleUpdateCourse = async (id: string, updates: Partial<Course>) => {
    try {
      await fetch(`/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      notify.success('Atualizado!', 'Mudanças foram salvas com sucesso');
    } catch (_) {
      notify.error('Erro de Atualização', 'Não foi possível atualizar');
    }
  };

  const handleDeleteCourse = async (id: string, title: string) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      notify.success('Deletado!', `"${title}" foi removido`);
    } catch (_) {
      notify.error('Erro ao Deletar', 'Não foi possível remover o curso');
    }
  };

  return (
    <div className="space-y-4">
      <PremiumButton onClick={() => handleCreateCourse({
        title: 'Novo Curso',
        description: 'Descrição',
      })}>
        + Criar Curso
      </PremiumButton>

      {/* Course list */}
    </div>
  );
}
```

### Exemplo 4: Validação de Formulário

```tsx
'use client';

import { useNotification } from '@/hooks/useNotification';

export default function RegisterForm() {
  const notify = useNotification();

  const handleValidate = (data: Record<string, any>) => {
    // Validações
    if (!data.email.includes('@')) {
      notify.warning('Email Inválido', 'Verifique o endereço de email');
      return false;
    }

    if (data.password.length < 8) {
      notify.warning('Senha Fraca', 'A senha deve ter pelo menos 8 caracteres');
      return false;
    }

    if (data.password !== data.confirmPassword) {
      notify.error('Senhas não Coincidem', 'Verifique as senhas digitadas');
      return false;
    }

    notify.success('Validação OK', 'Formulário pronto para enviar');
    return true;
  };

  return (
    // form JSX
    <div></div>
  );
}
```

### Exemplo 5: Integração com Async Operations

```tsx
'use client';

import { useNotification } from '@/hooks/useNotification';
import PremiumButton from '@/components/ui/PremiumButton';

export default function ExportDados() {
  const notify = useNotification();

  const handleExportCourses = async () => {
    const exportId = Date.now().toString();
    notify.info('Exportando...', 'Gerando arquivo, aguarde');

    try {
      const response = await fetch('/api/export/courses');
      const data = await response.json();

      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Baixar arquivo
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `courses-${new Date().toISOString()}.json`;
      a.click();

      notify.success(
        'Exportação Concluída!',
        'O arquivo foi baixado com sucesso'
      );
    } catch (_) {
      notify.error('Erro na Exportação', 'Não foi possível exportar os dados');
    }
  };

  return (
    <PremiumButton onClick={handleExportCourses}>
      📥 Exportar Cursos
    </PremiumButton>
  );
}
```

### Exemplo 6: Notifications com Actions Complexas

```tsx
'use client';

import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/navigation';

export default function PublishCourse({ courseId }: { courseId: string }) {
  const notify = useNotification();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/publish`, {
        method: 'POST',
      });

      const course = await response.json();

      notify.success('Publicado!', `"${course.title}" está ao vivo`, {
        action: {
          label: 'Visualizar',
          onClick: () => {
            // Ação customizada
            router.push(`/courses/${courseId}`);
          },
        },
        autoClose: 10000, // Fica 10 segundos
      });
    } catch (error) {
      notify.error('Erro na Publicação', 'O curso não pôde ser publicado');
    }
  };

  return (
    <button onClick={handlePublish}>
      🚀 Publicar Curso
    </button>
  );
}
```

---

## Padrões Recomendados

### ✅ DOs
- Use `notify.success` para operações bem-sucedidas
- Use `notify.error` para erros críticos
- Use `notify.warning` para avisos/confirmações
- Use `notify.info` para informações gerais
- Sempre forneca um título e mensagem clara
- Adicione action quando há uma próxima ação lógica

### ❌ DON'Ts
- Não use 5+ notificações por operação
- Não colocar muito texto (máx. 2 linhas)
- Não usar notificação para debug (use console.log)
- Não esquecer de catch em promises
- Não usar without unsubscribe em eventos

---

## Dicas

1. **Auto-close customizado:**
   ```tsx
   notify.success('Rápido', 'Msg', { autoClose: 2000 });
   ```

2. **Para operações longas:**
   ```tsx
   const id = notify.info('Processando', 'Aguarde...');
   // ... fazer algo
   notify.success('Pronto', 'Concluído'); // substitui a anterior
   ```

3. **Erro com Stack Trace:**
   ```tsx
   notify.error('Erro!', error.message);
   console.error(error); // Detalhes no console
   ```

4. **Confirmação com Action:**
   ```tsx
   notify.warning('Atenção', 'Isso não pode ser desfeito', {
     action: {
       label: 'Confirmar',
       onClick: () => { /* executar */ }
     }
   });
   ```

---

Para mais exemplos, veja `/showcase` page no projeto.
