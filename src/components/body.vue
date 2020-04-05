<template>
    <section>
        <div v-for="(item, index) in list" :key="`b_${index}`" :class="index > 0? 'next' : ''">
            <div v-if="item.name" class="preheader" style="margin-top: 40px">
                <h2>{{item.name}}</h2>
            </div>
            <chess-grid v-if="item.chessGrid" :list="item.chessGrid"/>
            <tiles-grid v-if="item.tilesGrid" :list="item.tilesGrid" :square="item.square" :thumbnailMode="item.thumbnailMode" :numColumns="item.numColumns"/>
            <list-box v-if="item.listBox" :list="item.listBox"/>
            <div v-if="item.slides">
                <slide-images :list="item.slides"/>
            </div>
            <div v-if="item.googleMap">
                <google-map :lat="item.googleMap.lat" :long="item.googleMap.long"/>
                <br>
                <div class="text-center">
                    <Button :url="`https://www.google.com/maps/dir//${item.googleMap.lat},${item.googleMap.long}`" label="Get Direction"/>
                </div>
            </div>
            <div v-if="item.googleReview">
                <google-review :placeID="item.googleReview.placeID"/>
            </div>
            <div v-if="item.table">
                <Table>
                    <template slot="header">
                        <th v-for="(label, index) in item.tableHeaders" :key="index">{{ label }}</th>
                    </template>
                    <template slot="body">
                        <tr v-for="(item, index) in item.table" :key="index">
                            <td v-for="(label, subIndex) in item" :key="subIndex">{{ label }}</td>
                        </tr>
                    </template>
                </Table>
            </div>
        </div>
    </section>
</template>
<script>

import Button from "@/components/core/Button"
import ToggleButton from "@/components/core/ToggleButton"
import LazyImage from "@/components/core/LazyImage"
import Table from "@/components/core/Table"

export default {
    components: {
        Button, ToggleButton, LazyImage, Table,
        "chess-grid": () => import('@/components/list/chess-grid'),
        "tiles-grid": () => import('@/components/list/tiles-grid'),
        "list-box": () => import('@/components/list/list-box'),
        "slide-images": () => import('@/components/list/slide-images'),
        "google-map": () => import('@/components/vendor/google-map'),
        "google-review": () => import('@/components/vendor/google-review')
    },
    props: {
        list: { type: Array }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/_color.scss";

body section:not(:first-child) {
    padding-top: 40px;
}

section {
    padding: 30px;
}

.section-body {
    background-color: $background;
}

.next {
    margin-top: 30px;
}

@media only screen and (max-width:720px) {
    section {
        padding: 20px;
    }
}

</style>
