<template>
    <div>
        <section class="wrapper">

            <div class="container">

                <div class="container-header">
                    <button-template :button-name="buttonName"
                                        :disabled-button="disabledButton"
                                        @get-user-data="getUserData"
                    />
                    <div class="spinner-section">
                        <spinner-template v-if="spin" />
                    </div>
                </div>

                <div v-if="showContent" class="container-content">

                    <div v-for="( item, index ) in users" :key="index" class="container-user-item">

                        <div class="container-item-header">

                            <span class="container-item-txt">Пoльзoватель: {{ item.id }}</span>

                            <div class="container-header-balance">
                                <span style="color: green;">{{ item.completedFalse }}</span>
                                <span>/</span>
                                <span style="color: red;">{{ item.completedTrue }}</span>
                            </div>

                        </div>

                        <div class="ul-section">

                            <ul v-for="( title, i ) in item.titles.slice( 0, -16)" :key="i">
                                <li>{{ title }}</li>
                            </ul>

                        </div>

                    </div>

                </div>

            </div>
        </section>

    </div>
</template>

<script>
import { getUniqueIds, splitUsers, userItems } from './components/controllers.js';
import ButtonTemplate from './components/ui/ButtonTemplate.vue';
import SpinnerTemplate from './components/ui/SpinnerTemplate.vue'

export default {
    components: {
        ButtonTemplate,
        SpinnerTemplate
    },

    data() {
        return {
            buttonName: 'Загрузить',
            baseURL: 'https://jsonplaceholder.typicode.com/todos',
            disabledButton: false,
            spin: false,
            showContent: false,
            usersStorage: [],
            usersStage: [],
            usersGrade: [],
            uniqueId: [],
            users: []
        };
    },

    methods: {
        async getUserData() {
            this.uniqueId = [];
            this.active ( true )

            try {
                const response = await fetch( this.baseURL );
                this.usersStorage = await response.json();
            } catch ( e ) {
                console.log( e );
            }
            this.formatDataRunner();
            this.users = userItems;
            this.active( false )
        },

        formatDataRunner() {
            getUniqueIds( this.usersStorage, this.uniqueId );
            splitUsers( this.usersStorage, this.uniqueId );
            this.showContent = true;       
        },

        active  ( prm ) {
            this.disabledButton = prm
            this.spin = prm
        }
    }
};

</script>

<style lang="scss">
@import '~/static/scss/custom.scss';

.wrapper {
    @include flex-column-start-center;
    flex-direction: column;
    height: auto;
    width: 100%;
    margin-top: 6px;
    margin-bottom: 10px;
    &:not(:first-child) {
        padding-bottom: 40px;
    }
}

.spinner-section {
    @include flex-start-center;
    height: 100%;
    width: 100%;
    margin-right: 16px;
}

.container {
    height: 80%;
    width: 90%;

    &-header {
        @include flex-start-center;
        height: 50px;
        width: 100%;
        background-color: $main-blue;
    }

    &-content {
        @include flex-between-center;
        flex-wrap: wrap;
        margin-top: 4px;
        height: calc( 100% - 54px );
        width: calc( 100% - 4px );
        border: $border;

        @media screen and ( max-width: 1880px ) {
            // @include flex-around-center;
            @include flex-center-center;
        }
    }

    &-user-item {
        height: 100%;
        max-height: 350px;
        width: 100%;
        max-width: 290px;
        border: $border;
        margin: 10px;

        @media screen and ( min-width: 1880px ) {
            max-width: 31%;
        }

        @media screen and ( max-width: 1880px ) {
            max-width: 31%;
        }

        @media screen and ( max-width: 1160px ) {
            max-width: 47%;
        }

        @media screen and ( max-width: 901px ) {
            max-width: 100%;
        }
    }

    &-chart {
        width: 90%;
    }

    &-content-chart {
        @include flex-center-center;
        margin-top: 4px;
        border: $border;
    }


    &-item-header {
        @include flex-between-center;
        padding: 10px;
        padding-left: 24px;
        padding-right: 24px;
    }

    &-header-balance {
        height: 20px;
        width: 20%;
    }

    &-item-txt {
        color: $main-grey-hover;
    }



    .ul-section {
        @include flex-center-start;
        flex-direction: column;
        border-top: $border;
        height: 86%;
        width: 100%;
    
    }

    li {
        height: 40px;
        margin-right: 20px;
        color: $main-grey-hover;
    }


    ::-webkit-scrollbar {
        width: 8px;
        border-left: 1px solid  $main-blue;
    }

    ::-webkit-scrollbar-thumb {
        border-left: 8px solid $main-blue;
    }
}
</style>
