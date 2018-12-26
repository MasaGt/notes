# Event Handling

1. 対象の要素にイベントリスナーを登録し、Vueインスタンスのプロパティ値の操作や、メソッドの呼び出しを行うことができる。   

2. 基本的な書き方  
  - HTML側   
  対象の要素の属性にv-on:[イベント名]="Vueインスタンスの操作"を追加する。(@[イベント名]はショートハンドラ)

    ↓Vueインスタンスのプロパティ値を直接操作。
          <p v-on:click="val += 1">
            クリックするとVueのvalをインクリメント
          </p>

    もしくは↓Vueインスタンスのメソッドを呼びだし、プロパティ値操作。
          <p @click="increment">
            ~
          </p>

  - JS側     
  メソッドを登録する方法は、インスタンス生成の際に渡す引数のオブジェクトに**moethods**というプロパティを追加する
        var app = new Vue({
          ~下に呼び出したいメソッドを追加していく~
          methods: {
            increment() {
              this.val += 1;
            },
          },
        });

3. さらに  
  3-1. メソッドを呼び出す際には引数を渡すことができる  
  - HTNL側   
          <p v-on:click="method(arg)"> ~ </p>

  - JS側   
          {
            methods: {
              mothod(arg) {
                ~;
              }
            }
          }

 3-2. alert()のようなwindowオブジェクトのメソッドはv-on内では呼べない  
 @click="alert('test')"のような書き方では、alertは呼べない →　Vueインスタンスにそんなメソッド定義されてないという旨のエラーメッセージが返される。   
 しかし、Vueインスタンスのmethodsで定義される関数内でalertやconsole等は普通に実行呼べる。
        Vue({
          methods: {
            test() {
              alert('test');　←　普通に実行できる
            }
          }
        });
