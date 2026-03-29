import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

describe("FlowTrack Dashboard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renderiza o dashboard com todos os componentes", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Painel de produtividade/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tarefas$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Hábitos Diários/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Metas da Semana/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pomodoro/i })).toBeInTheDocument();
    expect(screen.getByText(/Hora local/i)).toBeInTheDocument();
  });

  it("adiciona e conclui uma tarefa", async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Adicionar nova tarefa/i);
    const addButton = screen.getByRole("button", { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: "Nova tarefa" } });
    fireEvent.click(addButton);

    expect(await screen.findByText("Nova tarefa")).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText(/^Concluídas:/i)).toBeInTheDocument();
    });
  });

  it("filtra tarefas por status", async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Adicionar nova tarefa/i);
    const addButton = screen.getByRole("button", { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: "Tarefa pendente" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Tarefa concluída" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    const completedTab = screen.getByRole("button", { name: /Concluídas/i });
    fireEvent.click(completedTab);
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa pendente")).not.toBeInTheDocument();

    const pendingTab = screen.getByRole("button", { name: /Pendentes/i });
    fireEvent.click(pendingTab);
    expect(screen.getByText("Tarefa pendente")).toBeInTheDocument();
  });

  it("interage com hábitos básicos", async () => {
    render(<Home />);
    const habitButton = screen.getByRole("button", { name: /Água/i });
    expect(habitButton).toBeInTheDocument();
    fireEvent.click(habitButton);
    expect(habitButton).toHaveTextContent(/Concluído/);
  });

  it("renderiza componentes do Pomodoro", () => {
    render(<Home />);
    expect(screen.getByText(/Iniciar|Pausar/i)).toBeInTheDocument();
  });
});
