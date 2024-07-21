<template>
  <VerticalStack spacing="lg">
    <form>
      <VerticalStack spacing="lg">
        <InputContainer label="First Name">
          <input type="text" placeholder="John"/>
        </InputContainer>
        <InputContainer label="Last Name">
          <input type="text" placeholder="Doe"/>
        </InputContainer>
        <InputContainer label="Preferred Name">
          <input type="text" placeholder="JD"/>
        </InputContainer>
      </VerticalStack>
    </form>
  </VerticalStack>
</template>

<script setup lang="ts">

  import Input from "./InputContainer.vue";
  import VerticalStack from "./VerticalStack.vue";
  import InputContainer from "./InputContainer.vue";



</script>

<style scoped>

</style>