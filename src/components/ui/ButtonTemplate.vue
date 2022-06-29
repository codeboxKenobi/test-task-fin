<template>
    <div class="btn-template">
        <button :disabled="disabledButton" class="btn-template-item" type="button" @click="clickHandler">{{ buttonName }}</button>
    </div>
</template>

<script>

export default {

    props: {
        buttonName: { type: String, default: '' },
        disabledButton: { type: Boolean, default: () => { return false } }
    },

    data() {
        return {

        }
    },

    methods: {
        clickHandler() {
            this.$emit( 'get-user-data' );
        }
    }
};

</script>

<style lang="scss" scoped>
@import '~/static/scss/custom.scss';

.btn-template {
    @include flex-start-center;
    height: 100%;
    width: 20%;

    @media screen and ( max-width: 520px ) {
         @include flex-center-center;
    }

    &-item {
        @include flex-center-center;
        height: 60%;
        width: 20%;
        margin: 14px;
        min-width: 160px;
        outline: none;
        border: none;
    }

}

</style>
