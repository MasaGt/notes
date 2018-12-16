# Vue instance

1. Vueインスタンスとは、Vueの核
 - Vueインスタンスが、htmlファイル内の変数をバインドする

#### データバインディング
- 基本
  - HTML側  
    1. 以下を記載  
      {{ paramName }}  
      **paramNameはなんでもOK**  
    2. CND経由でvue.jsをダウンロード
      https://vuejs.org/v2/guide/index.html
  - JS側  
    1.  Vueインスタンスを生成し、引数にプロパティを設定したオブジェクトを渡す   
    ・el: データを渡す対象のセレクタ(id→#~、class→.~　等)
    ・data:HTML側に渡したいデータ
            var sample = new Vue({
              el: 'elemname';
              data: {
                paramName: '渡すデータだよ',
              }
            });

- さらに  
  1. 複数のデータを設定できる
          HTML側
          {{ val1 + val2 }}

          JS側
          var app = new Vue({
              el: '~',
              data: {
                val1: '値1',
                cal2: '値2'
              }
          });
  2. 数式も可能 **{{}}は式なので**
          HTML側
          {{ string + (int1 + int2) }}

          JS側
          new Vue({
            el: '~',
            data: {
              string: '文字列',
              int1: 8,
              int2: 2,
            }
          });
  3. オブジェクトのメソッドも実行することが可能　**{{}}は式なので**  
          HTML側
          {{ hands.join('-') }}

          JS側
          new Vue({
            el: '~',
            data: {
              hands: ['rock', 'paper', 'scissors'],
            }
          });
