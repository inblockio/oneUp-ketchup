<template>
  <app-layout-minimal>
    <app-card contextual-style="dark">
      <div slot="body">
        <div class="row">
          <div class="content">
            <world></world>
          </div>
        </div>
      </div>
    </app-card>
  </app-layout-minimal>
</template>

<script>
import LayoutFull from '../layout/full.vue';
import LayoutMinimal from '../layout/minimal.vue';
import Card from '../components/card.vue';
import World from '../components/world.vue';

export default {
  name: 'app-home',
  components: {
    'app-layout-full': LayoutFull,
    'app-layout-minimal': LayoutMinimal,
    'app-card': Card,
    world: World,
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>

.content{
  background-color:#ccc;
  position:fixed;
  top:0;
  left:0;
  /*height:100%;
  width:100%;*/
}

</style>
