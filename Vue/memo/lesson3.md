# Attribute binding

1. 条件による要素の生成・非生成  
  Vueインスタンスのプロパティを参照し、その値によって要素をレンダリングしたり・しなかったりできる。  

2. 基本的な書き方  
  - HTML側  
  対象の要素にv-if、v-else-if、v-else属性を追加する。  
  **v-if=""の""内は式になるので、条件式を書くだけ。  
  ほとんど利用する場面はないと思うが、Vueインスタンスのプロパティ値を参照しなくとも別によい(10 > 0とかでtrueが普通に返却される)**
          <p v-if="isAvailable">This is available<p>
          <p v-else>This is not available<p>

  - JS側   
  条件の判断となる値をプロパティに追加するだけ。
          var app = new Vue({
            elem: "~",
            data {
              isAvailable: true,
            },
          });

3. さらに   
  - 要素の表示・非表示   
  v-ifは、条件判定によって、要素の生成をしたり・しなかったりする機能。  
  **要素の表示・非表示を条件によって切り替えたい場合**は、v-ifの代わりにv-show=""を対象の要素の属性に追加する。   
  v-else-show=""とかは無いので、v-else-ifみたいなことをしたい場合は、v-showを連続して書く。
  
