<!-- client\src\views\PageFindUs.vue -->
<script>
export default {
  name: "App",
  data() {
    return {
      center: { lat: 42.63612256076243, lng: 23.36976168577798 },
      markers: [
        {
          position: {
            lat: 42.63612256076243,
            lng: 23.36976168577798
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
