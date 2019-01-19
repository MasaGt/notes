# Components   

1. 概要   
DOM要素をモジュール化し、再利用できるようにするVueの機能。  
コンポーネントは名前付きの再利用可能な Vue のインスタンスらしい。  
　→HTML側では、その名前の独自タグを利用するだけ。(値も渡すことができる)

2. 基本的な書き方  
  <font color="red">※コンポーネントの作成・利用方法はいろいろあるが、ここでは公式チュートリアルで紹介されている方法を記載。</font>  


  - JS側  
  Vue.componentに定義する。  
  第1引数：コンポーネント名前    
  第2引数：コンポーネントの内容  
          Vue.component(
            '登録する名前',
            {
              template: 'コンポーネントのDOM構成(<h1>~~~</1>等)',
              data: function() {
                return Vueオブジェクト(dataプロパティのみ);
              },
              methods: {
                必要であれば
              },
              computed: {
                必要であれば
              },
            }  
          );
    **<font color="red">・templateには、1つだけのルートを持つのDOMしか書けない(子要素はいくつあってもOK)  
    ・templateはバッククオーテーションで囲む</font>**  


  - HTML側   
    Vue.componentに定義された'登録する名前'の独自タグを利用する。  
          <body>
            <登録する名前></登録する名前>
          </body>

  **※Vue.componentの第二引数にあるdataは関数にすること**  
  **  → 同じコンポーネントを複数使いまわす際に、各コンポーネントが各々のデータを保持するため。**   


3. 例：クリック回数を表示するボタンコンポーネント  
  - JS側
          Vue.component('sample', {
            template: '<button>component button</button>',
            data: function() {
              return {};
            },
            methods: {},
            computed: {},
          });

          var app = new Vue({
            elem: '#app',
          });

  - HTML側  
          <body>
            <div id="app">
              <sample></sample>
            </div>
          <body>

4. さらに    
  4-1. 子コンポーネントにデータを渡すこともできる。(配列ver)  
    - JS側  
    Vue.componentの第2引数にpropsプロパティを追加し、渡される値のラベル名を付ける  
          Vue.component('title', {
            props: [msg],
            data: function () {
              return {};
            },
            template: '<h1> {{ msg }} </h1>'
          });

    - HTML側   
    propsプロパティに記載したラベル名を属性として指定し、値を渡す。  
            <title msg="Hello"></title>

  4-2. 子コンポーネントにデータを渡すこともできる(オブジェクトver)  
    - JS側  
    Vue.componentの第2引数のpropsをオブジェクトにすることでバリデーションをかけることができる。
            Vue.component('title',{
              props: {
                ラベル名: {
                  type: String,
                  required: false,
                  default: 'default message here',
                  等
                },
              },
            });

　4-3. 子コンポーネントにデータを渡す際の注意点
　親のdataプロパティを子コンポーネントに渡す際は以下の事に注意すること。
  1:子コンポーネントにpropsプロパティを定義し忘れないこと。
  2:<font color="red">HTML側に記載するprops名に:(v-bind)を付けること</font>
  3:子コンポーネント側ではthis.props名で親から渡されたデータを参照可能。
