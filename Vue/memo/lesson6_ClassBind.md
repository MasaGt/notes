# Class Binding

1. 概要  
  対象の要素に、conditionalなクラス名を付与することができる。

2. 基本的な書き方  
  -　HTML側  
  対象となるHTML要素の属性にv-bind:class(または:class)を追加する。  
  ""内部にはオブジェクト形式**({ 付与したいクラス名 : boolean(true/false)})**で指定。 booleanがtrueの時に、指定したクラス名が付与される。  

  以下は、p要素にdisableクラスだけを付与する例。
        <p :class="{disable: isDisable, blind: isBlind}">


  - JS側   
  参照するboolean値をVueインスタンスに保持する場合は、dataプロパティに持つ。  
        new Vue({
          data: {
            isDisable: true,
            isBlind: false,
          },
        });

3. さらに  
  3-1. 様々な指定方法
  - :classにVueインスタンスのオブジェクトをそのまま渡すことも可能  
    **この方法だと、Vueインスタンスのtrueのプロパティ名が、クラス名として付与される**

    以下は、p要素にクラス名*isDisable*だけを付与する例。
    - HTML側  
          <p :class="classObj">

    - JS側   
           new Vue({
            data: {
              classObj: {
                isDisable: true,
                isBlind: false,
              }
            }
           });

  3-2. conditionalでないクラス名の付与  
    :class=""に文字列でそのままクラス名を入力すれば、入力した文字列そのままのクラス名が付与される。  

    いかは、p要素にvueBoxというクラス名を付与する例。
    - HTML側
          <p>:class="classNm">

    - JS側  
          new Vue({
            data: {
              classNm: "vueBox",
            },
          });

   **上記方法で複数のクラス名を付与したい場合は、:classに配列形式でクラス名を渡す**
   - HTML側
         <p>:class="[classNm1, classNm2]">

   - JS側  
         new Vue({
           data: {
             classNm1: "vueBox1",
             classNm2: "vueBox2",
           },
         });

　3-3. 参考演算子も利用可能  
  :class="[boolean ? true時のクラス名 : false時のクラス名]"
