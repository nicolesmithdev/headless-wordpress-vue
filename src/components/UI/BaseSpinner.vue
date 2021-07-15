<template>
    <div class="spinner">
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.spinner {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;

    .lds-roller {
        display: inline-block;
        height: 80px;
        position: relative;
        width: 80px;

        div {
            animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            transform-origin: 40px 40px;

            &:after {
                background-color: $default-color;
                border-radius: 50%;
                content: " ";
                display: block;
                height: 7px;
                margin: -4px 0 0 -4px;
                position: absolute;
                width: 7px;
            }

            &:nth-child(1) {
                animation-delay: -0.036s;
                
                &:after {
                    left: 63px;
                    top: 63px;
                }
            }

            &:nth-child(2) {
                animation-delay: -0.072s;

                &:after {
                    left: 56px;
                    top: 68px;
                }
            }

            &:nth-child(3) {
                animation-delay: -0.108s;

                &:after {
                    left: 48px;
                    top: 71px;
                }
            }

            &:nth-child(4) {
                animation-delay: -0.144s;

                &:after {
                    left: 40px;
                    top: 72px;
                }
            }

            &:nth-child(5) {
                animation-delay: -0.18s;

                &:after {
                    left: 32px;
                    top: 71px;
                }
            }

            &:nth-child(6) {
                animation-delay: -0.216s;

                &:after {
                    left: 24px;
                    top: 68px;
                }
            }

            &:nth-child(7) {
                animation-delay: -0.252s;

                &:after {
                    left: 17px;
                    top: 63px;
                }
            }

            &:nth-child(8) {
                animation-delay: -0.288s;

                &:after {
                    left: 12px;
                    top: 56px;
                }
            }
        }
    }
}

@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>