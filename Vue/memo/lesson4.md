# List Rendering

1. v-forという属性を利用すると、簡単に配列データをリスト形式で表示できる。  
**オブジェクトのプロパティも同じようにできる。**

2. 基本的な書き方   
  - HTML側  
  列挙したい要素の属性にv-for=""を追加する。  
  ""内は式になるので、for文でも使うin構文を記述  
          <ul>
            <li v-for="item in items">
              {{ item }}
            </li>
          </ul>

          以下も同じ
          <ul>
            <li v-for="n in items.length">
              {{ items[n-1] }}
            </li>
          </ul>
  - JS側   
  v-forの対象となる配列またはオブジェクトデータを持つVueインスタンスの生成  
          var app = new Vue({
            elem: "~",
            data: {
               items: ["apple", "orange", "grape"],
              },
            });

          もしくは
          ~
          data: {
            items: {
              item1: "apple",
              item2: "orange",
              item3: "grape",
            }
          }
          ~

**\*別にli要素以外にもv-for=""を使ってもいい(p要素とか)。**

3. さらに  
　3-1. オブジェクトの配列をv-forで回す。  
  下記はitems配列に入っている各オブジェクトのnameプロパティ値を列挙する例
  - HTML側
          <ul>
            <li v-for="item in items">
              {{ item.name }}
            </li>
          </ul>

  - JS側   
          var app = new Vue(
            elem: "~",
            data: {
            items: [
               {name: "apple", price: 100},
               {name: "orange", price: 200},
               {name: "grape", price: 300},
              ],
            },
          );

  3-2. 指定した回数繰り返したい場合  
  v-for="n in 10"　で10回繰り返す。  
  **nには1～10が順番に入る   **

  3-3. key属性  
  v-forで描画した要素を順番を変えて再描画する時、Vueは各DOM要素に対してパッチをあてる(DOM要素は使いまわして、中身を更新する)。   

  この仕様は、効率はいいのだがいくつかのケースで不具合が生じる。  
  例：https://kntmr.hatenablog.com/entry/2018/08/15/032619   

  **各DOM要素を対応するデータにバインドする場合はDOM要素にv-bind:key(:key)属性を追加する必要がある。**

  以下はオブジェクトの配列をv-forでリストレンダリングし、各DOM要素に対してオブジェクトのidでバインドしている例。
    - HTML側
          <li v-for:"item in items" v-ind:key="item.id">
            {{ item.name }}
          </li>

    - JS側   
          var app = new Vue({
            elem: "~",
            data: {
              items: [
                {id:1, name: "apple"},
                {id:2, name: "orange"},
                {id:3, name: "grape"},
              ]
            }
          });

  3-4. 公式のリファレンス  
  https://vuejs.org/v2/guide/list.html#key
