<template>

    <!-- 加载中 蒙层组件 -->

    <div class="modal-box">
        <div class="modal-center">
           <slot></slot>
        </div>
    </div>
    
</template>


<style scoped>

.modal-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
}
.modal-center{
    position: absolute;
    left: 50%;
    top: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;

}


</style>