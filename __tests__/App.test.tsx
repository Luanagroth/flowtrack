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
    expect(screen.getByRole("heading", { name: /Hábitos diários/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Metas da semana/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pomodoro/i })).toBeInTheDocument();
    expect(screen.getByText(/Hora local e data/i)).toBeInTheDocument();
  });

  it("adiciona e conclui uma tarefa", async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Ex.: Revisar proposta comercial/i);

    fireEvent.change(input, { target: { value: "Nova tarefa" } });
    fireEvent.submit(input.closest("form")!);

    expect(await screen.findByText("Nova tarefa")).toBeInTheDocument();

    const taskToggleButton = screen.getByRole("button", { name: /Alternar tarefa Nova tarefa/i });
    fireEvent.click(taskToggleButton);

    await waitFor(() => {
      expect(screen.getByText("Nova tarefa")).toHaveClass("line-through");
    });
  });

  it("separa tarefas pendentes e concluídas em blocos distintos", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Ex.: Revisar proposta comercial/i);

    fireEvent.change(input, { target: { value: "Tarefa pendente" } });
    fireEvent.submit(input.closest("form")!);

    fireEvent.change(input, { target: { value: "Tarefa concluída" } });
    fireEvent.submit(input.closest("form")!);

    fireEvent.click(screen.getByRole("button", { name: /Alternar tarefa Tarefa concluída/i }));

    expect(screen.getByText(/^Pendentes$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Concluídas$/i)).toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente")).toBeInTheDocument();
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
  });

  it("permite adicionar nota em uma tarefa", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Ex.: Revisar proposta comercial/i);

    fireEvent.change(input, { target: { value: "Tarefa com nota" } });
    fireEvent.submit(input.closest("form")!);

    fireEvent.click(screen.getByRole("button", { name: /Adicionar nota na tarefa Tarefa com nota/i }));
    fireEvent.change(screen.getByPlaceholderText(/Ex.: Revisar antes da reunião/i), {
      target: { value: "Lembrar de revisar os detalhes antes de finalizar." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Salvar nota/i }));

    expect(screen.getByText("Lembrar de revisar os detalhes antes de finalizar.")).toBeInTheDocument();
  });

  it("permite adicionar, editar e concluir hábitos", () => {
    render(<Home />);

    const addHabitInput = screen.getByPlaceholderText(/Ex.: Beber 2L de água/i);
    fireEvent.change(addHabitInput, { target: { value: "Meditar" } });
    fireEvent.submit(addHabitInput.closest("form")!);

    expect(screen.getByText("Meditar")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Editar hábito Meditar/i }));
    fireEvent.change(screen.getByPlaceholderText(/Ex.: Ler 20 páginas/i), { target: { value: "Meditar 10 min" } });
    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    const habitButton = screen.getByRole("button", { name: /Alternar hábito Meditar 10 min/i });
    fireEvent.click(habitButton);
    expect(habitButton).toHaveTextContent(/Concluído/);
  });

  it("permite adicionar nota em um hábito", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /Adicionar nota no hábito Água/i }));
    fireEvent.change(screen.getByPlaceholderText(/Ex.: Fazer antes das 8h/i), {
      target: { value: "Lembrar de manter consistência durante a semana." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Salvar nota/i }));

    expect(screen.getByText("Lembrar de manter consistência durante a semana.")).toBeInTheDocument();
  });

  it("permite editar, concluir e adicionar nota em metas da semana", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /Editar meta Planejar sprint/i }));
    fireEvent.change(screen.getByPlaceholderText(/Ex.: Finalizar onboarding/i), {
      target: { value: "Planejar sprint revisada" },
    });
    fireEvent.change(screen.getAllByLabelText(/Total da meta/i)[1], {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Progresso da meta/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    expect(screen.getByText("Planejar sprint revisada")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Alternar meta Planejar sprint revisada/i }));
    expect(screen.getByText(/Meta concluída/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Adicionar nota na meta Planejar sprint revisada/i }));
    fireEvent.change(screen.getByPlaceholderText(/Ex.: Validar com o time até sexta/i), {
      target: { value: "Validar com o time antes de fechar a semana." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Salvar nota/i }));

    expect(screen.getByText("Validar com o time antes de fechar a semana.")).toBeInTheDocument();
  });

  it("renderiza componentes do Pomodoro", () => {
    render(<Home />);
    expect(screen.getByText(/Iniciar|Pausar/i)).toBeInTheDocument();
  });
});
