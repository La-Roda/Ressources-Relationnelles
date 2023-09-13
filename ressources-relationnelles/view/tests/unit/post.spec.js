import { mount } from '@vue/test-utils';
import PostComponent from '@/components/posts/post.vue';

describe('PostComponent', () => {
  it('should display post information correctly', () => {
    const post = {
      username: 'john_doe',
      content: 'This is a test post',
      // ... other properties
    };
    const isMine = true;

    const wrapper = mount(PostComponent, {
      propsData: {
        post,
        isMine,
      },
    });

    // Vérifier que les informations du post sont correctement affichées
    expect(wrapper.find('.infos_user span').text()).toBe(post.username);
    expect(wrapper.find('.post-text').text()).toBe(post.content);
  });
});
