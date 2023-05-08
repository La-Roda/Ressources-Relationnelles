import { mount } from '@vue/test-utils';
import LoginComp from '@/components/login/loginComp.vue';

describe('MyComponent', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn().mockResolvedValue(),
    };

    wrapper = mount(LoginComp, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should call login action when login button is clicked', async () => {
    wrapper.setData({
      isLogin: true,
      login: 'test@example.com',
      password: 'password',
    });

    await wrapper.find('.login').trigger('click');

    expect(mockStore.dispatch).toHaveBeenCalledWith('login', {
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should call register action when register button is clicked', async () => {
    wrapper.setData({
      isLogin: false,
      nom: 'John',
      prenom: 'Doe',
      pseudo: 'johndoe',
      email: 'john@example.com',
      registerPassword: 'password',
      sexe: 'Homme',
      date: '2023-05-08',
    });
    await wrapper.vm.$nextTick(); // Attendre la mise à jour du rendu du composant
    await new Promise(resolve => setTimeout(resolve, 100)); // Ajouter une temporisation de 100ms
  
    await wrapper.find('.register').trigger('click');

    expect(mockStore.dispatch).toHaveBeenCalledWith('register', {
      lastname: 'John',
      firstname: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password',
      sex: 'Homme',
      birthday: '2023-05-08',
    });
  });
});
