import { mount } from "@vue/test-utils";
import TodoItem from "../../components/TodoItem.vue";
import type { Todo } from "../../types";

describe("TodoItem", () => {
  test("Deve renderizar o component", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    expect(wrapper.find(".todo").exists()).toBe(true);
  });

  test("Deve ter a classe 'completed'", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    expect(wrapper.find(".todo.completed").exists()).toBe(true);
  });

  test("Deve ter a classe 'editing' após clicar duas vezes no label", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    await wrapper.find(".view label").trigger("dblclick");

    expect(wrapper.find(".todo.editing").exists()).toBe(true);
  });

  test("Deve remover a classe 'editing' após pressionar esc", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      }
    });

    await wrapper.find(".view label").trigger("dblclick");

    await wrapper.find(".edit").trigger("keyup.esc");

    expect(wrapper.find(".todo").classes()).not.toContain("editing");
  });

  test("Deve emitir o evento 'change' após clicar no checkbox", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    await wrapper.find(".toggle").trigger("change");

    const event = wrapper.emitted().change[0] as any[];

    expect(event[0]).toBeTruthy();
    expect(event[0]).toMatchObject({
      id: "1234",
      text: "Teste",
      completed: false,
    } as Todo)
  });

  test("Deve emitir o evento 'change' após pressionar 'enter'", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    await wrapper.find(".view label").trigger("dblclick");

    const input = wrapper.find(".edit");

    await input.setValue("Teste 2");

    await input.trigger("keyup.enter");

    const event = wrapper.emitted().change[0] as any[];

    expect(event[0]).toBeTruthy();
    expect(event[0]).toMatchObject({
      id: "1234",
      text: "Teste 2",
      completed: true,
    } as Todo)
  });

  test("Deve emitir o evento 'delete'", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    await wrapper.find(".destroy").trigger("click");

    const event = wrapper.emitted().delete[0] as any[];

    expect(event[0]).toBeTruthy();
    expect(event[0]).toMatchObject({
      id: "1234",
      text: "Teste",
      completed: true,
    } as Todo)
  });

  test("Deve exibir o texto", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: "1234",
          text: "Teste",
          completed: true,
        } as Todo,
      },
    });

    expect(wrapper.find(".view label").text()).toBe("Teste");
  });
});
