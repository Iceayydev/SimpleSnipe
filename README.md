# SimpleSnipe
## Open source roblox UGC sniper, with a customizable, easy to use GUI.

---

## Installation
First, you'll need [Tampermonkey](https://www.tampermonkey.net/) to run this script.
After you install tampermonkey, you'll need to **click** on the **extension icon**, and open your **dashboard**.
Next, you'll need to **click** the **plus** icon on the top bar, and **create a new userscript**
Once you have a blank **userscript open**, with a long greyish block of code at the top, you'll need to open the `script.ts` file in this **repository**
You'll need to **paste** the **contents of that file** into the **black userscript**.
**Before you can use the script**, you'll need to **click** file, and **save** . Then, you can **close the script tab**, find an item you want to snipe, and **adjust your settings**, then **start your sniper**.

---

## Customization
Customization is made easy due to how everything is organized, heres a guide to help you out:

### Background

To change it's **gradient** to bottom right/left we can use:
```ts
background: 'linear-gradient(to bottom right, color1, color2)',
```
To change it to top bottom we can use:
```ts
background: 'linear-gradient(to top, color1, color2)',
```

To make a **radial gradient** we can use:

```ts
background: 'radial-gradient(circle, color1, color2)',
```

Remember, the position of where you put **color1** and **color2** will change their position in the gradient, so its okay to swap those!

If you want a **plain background**, you can do:
```ts
background: rgba(0, 0, 0, 0);
```
The color order is **red, green, blue, alpha**. An alpha of **0 means fully transparent**. So the above example is a fully **transparent background**.

You can also change the **border colors**, and **size**, by **manipulating this line**:
```ts
border: '5px solid rgba(0, 0, 0, 0)',
```
This also follows the same **red, green, blue, alpha order**, and changing the **number in 5px will set how many pixels thick** the border is.

You can also change the **position of the sniper**, by manipulating:
```ts
top: '50%',
left: '80%',
```
Manipulating the `top:` will change the **distance percentage from the top of the screen**.
Manipulating the `left:` will change the **distance percentage from the bottom of the screen**.

You can also **change the size**, but this will **not** change the **size of elements inside the box properly**. You still have the option to do this anyway by doing:
```ts
height: '325px',
width: '280px',
```
The sizes, just like the border is measured in **pixels**.

Lastly, you can change the **border radius**. You can do this easily by doing:
`borderRadius: '10px',`
These are also measured in **pixels**.

I recommend not changing `position`, `padding` and `transform` unless you need to.

### Buttons

You can change the button style easily, heres how!

You can change the **button background** the same way you changed the snipers background.
```ts
background: 'rgba(0, 0, 0, 0.5)', or background: 'radial-gradient(circle, color1, color2)', or background: 'linear-gradient(to bottom right, color1, color2)',
```

You can change the **button thickness** and **color**, too. You can change the thickness by changing the `1px` value, and you can change the color by changing the `rgba` value.
border: '1px solid rgba(0, 0, 0, 0.2)',

### Texboxes support the same style configs as the Background and Buttons.

Thats all!
