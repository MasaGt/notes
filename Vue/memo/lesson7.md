# Computed Property   

1. 概要  
  Vueインスタンスのdataプロパティに対して処理を行いたいとい等に利用できる。  
  methodsと似てるやつ。  

2. 基本的な書き方
  - HTML側  
  Vueインスタンスのプロパティを参照するのと同じ方法。
  {{ computed property名　}}
          <p>{{ computedProp }}</p>

  - JS側  
  Vueインスタンス生成時の引数にcomputedというプロパティを追加し、その中に関数を定義する。   
  定義した関数(の処理結果)は、Vueインスタンスのプロパティとして追加される。  
          new Vue({
            data: {
              fNm: "Tanaka",
              lNm: "Taro",
            },
            computed: {
              computedProp() {
              return this.fNm + ' ' + this.lNm;
              },
            },
          });

3. methodsとの違い  
  3-1. methodsはVueインスタンスのメソッドとして定義され、computedはVueインスタンスのプロパティとして定義される。

  3-2. computedの処理結果はキャッシュされる。  
  [例] 乱数を生成する処理をmethods/computed両方に定義。
        new Vue({
          methods: {
            randomFunc() {
              return Math.random();
            },
          },
          computed: {
            randomProp() {
              return Math.random();
            },
          },
        });

  HTML側で...  
  - {{ randomFunc }}を呼び出す   
    呼び出されるごとに結果が異なる → 呼び出されるごとに実行されている。  
  - {{ randomProp }}を参照する   
    一回目の実行結果と同じ →　キャッシュされている。  

  **computedで定義されている関数は、その関数内で利用されている入力値が変更・更新されない限り、処理結果をキャッシュしておく。*  

4. さらに  
  4-1. computedに引数を渡す  
  - JS側  
  computed propertyにて関数を返すにする。  
          new Vue({
            computed: {
              greeting(name) {
                return function (name) {
                  console.log('hi' + ' ' + name);
                };
              },
            },
          });

  - HTML側   
  定義されたcomputed propertyのgreetingの実体は関数なので、{{ greeting('Taro') }}で実行可能
