<!-- client\src\views\PageFindUs.vue -->
<script>
export default {
  name: "App",
  data() {
    return {
      center: { lat: 42.6844, lng: 23.3192 },
      markers: [
        {
          position: {
            lat: 42.6844,
            lng: 23.3192
          }
        }
      ]
    };
  }
};
</script>

<template>
  <div class="full" id="map">
    <GMapMap :center="center" :zoom="16" map-type-id="roadmap" style="width: 100vw; height: calc(100vh - (53px + 38px))">
      <GMapCluster>
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center = m.position" />
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<style scoped>
.full {
  margin-top: 53px;
  margin-bottom: 38px;
}
</style>
