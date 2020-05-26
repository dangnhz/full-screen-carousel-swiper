<template>
    <div id="contact">
        <div class="contact-container">
            <div class="contact-header col-md-12">
                <div class="title">Get in touch.</div>
                <div class="line"></div>
                <p>Want to chat about a project? Let’s talk.</p>
            </div>
            <div class="contact-form col-md-8 col-lg-6 m-auto">
                <input type="text" placeholder="Name">
                <input type="text" placeholder="Email">
                <textarea type="text" placeholder="Tell us about your project..." />
                <button type="submit"> Send it</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contact'
    }
</script>

<style lang="less" scoped>
@import '../assets/style/setting.less';
.contact-container {
    background: white;
    padding: 10rem 0;
    .contact-header {
        // text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .title {
            font-size: 100px;
            font-weight: 700;
            @media @mobile {
                font-size: 2.5rem;
            }

            @media @tablet {
                font-size: 60px;
            }
        }
        .line {
            margin-top: 2rem;
            width: 100px;
            height: 8px;
            content: '';
             background: #e44a5a;
        }

        p {
            margin: 3rem 0;
            font-size: 1.5rem;
            @media @mobile {
                font-size: 1rem;
            }
        }
    }
    .contact-form {
        input, textarea  {
            width: 100%;
            padding: 1rem;
            outline: 0;
            margin: 2rem 0;
        }

        textarea {
            width: 100%;
            height: 10rem;
        }

        button {
            padding: 10px 2rem;
            background: #333;
            color: white;
            outline: 0;
            text-transform: uppercase;
        }
    }
}
</style>