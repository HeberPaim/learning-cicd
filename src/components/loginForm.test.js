import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './loginForm';

describe('Formulário de Login', () => {
  test('deve renderizar os campos de email e senha', () => {
    render(<Form />);
    const emailInput = screen.getByLabelText('Email');
    const senhaInput = screen.getByLabelText('Senha');

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
  });

  test('deve atualizar o estado ao digitar nos inputs', () => {
    render(<Form />);
    const emailInput = screen.getByLabelText('Email');
    const senhaInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'teste@teste.com' } });
    fireEvent.change(senhaInput, { target: { name: 'senha', value: '123456' } });

    expect(emailInput.value).toBe('teste@teste.com');
    expect(senhaInput.value).toBe('123456');
  });

  test('deve mostrar sucesso ao inserir credenciais corretas', () => {
    render(<Form />);
    const emailInput = screen.getByLabelText('Email');
    const senhaInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: /acessar/i });

    fireEvent.change(emailInput, { target: { name: 'email', value: 'eduardo.lino@pucpr.br' } });
    fireEvent.change(senhaInput, { target: { name: 'senha', value: '123456' } });
    fireEvent.click(button);

    expect(screen.getByText('Acessado com sucesso!')).toBeInTheDocument();
  });

  test('deve mostrar erro ao inserir credenciais erradas', () => {
    render(<Form />);
    const emailInput = screen.getByLabelText('Email');
    const senhaInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: /acessar/i });

    fireEvent.change(emailInput, { target: { name: 'email', value: 'errado@teste.com' } });
    fireEvent.change(senhaInput, { target: { name: 'senha', value: 'errado123' } });
    fireEvent.click(button);

    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
  });

  test('deve limpar a mensagem de acesso ao mudar os campos', () => {
    render(<Form />);
    const emailInput = screen.getByLabelText('Email');
    const senhaInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: /acessar/i });

    // gera erro primeiro
    fireEvent.change(emailInput, { target: { name: 'email', value: 'errado@teste.com' } });
    fireEvent.change(senhaInput, { target: { name: 'senha', value: 'errado' } });
    fireEvent.click(button);

    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();

    // agora limpa ao mudar
    fireEvent.change(emailInput, { target: { name: 'email', value: 'novoemail@teste.com' } });

    expect(screen.queryByText('Usuário ou senha incorretos!')).not.toBeInTheDocument();
  });
});
