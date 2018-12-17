# Attribute binding

1.  要素の属性値のバインド  
 JS側で変更すると、HTML側の対応する要素の属性値を動的に変更することができる。  
 Vueインスタンスのdataプロパティが値を持っている。

2. 基本的な書き方  
  - HTML側  
  対称の属性名の前に(v-bind):を付け、属性値に設定したいVueオブジェクトのdataプロパティのキー名を指定。  
          <img v-bind:src="image">
          もしくは
          <img :src="image">
  **※v-bind:を付けると、""は式になる。その為、""内に1+2と書くと、計算され、3となる。  
  応用方法としては、{{}}と多分同じ
  **

  - JS側
  VueオブジェクトのdataプロパティにHTML側に反映したい値を追加  
          new Vue({
            el: '~',
            data; {
              image: 'whatever',
            }
          });
