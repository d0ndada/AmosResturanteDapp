import React from "react";
import "./About.css";
import AmoKarim from "../../../Images/Amo.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>Amos Kebab</h2>
        <div className="amo-details">
          <div className="about-image-container">
            <img src={AmoKarim} />
          </div>
          <div className="text-container">
            <p>
              Hi! It's me, Tariq Alkhizais, the man behind the Comviq
              commercials. But today I want to talk to you about something else
              - my dream of opening a kebab restaurant!
              <br />
              <br />
              I know, I know, it might sound a bit strange. But the fact is,
              I've always had a passion for food. Especially kebab. I can still
              remember how, as a little boy, I used to stand and watch as my
              uncle cooked kebab on the grill.
              <br />
              <br />
            </p>
            <p>
              Since then, I've always dreamt of opening my own kebab place. But
              life took a different turn, and I ended up in front of the camera
              as the Comviq guy. But the dream was always there.
              <br />
              <br />
              So when I finally got the chance to do what I've always wanted, I
              saw no reason to wait any longer. I knew exactly what my
              restaurant would be called - Amos kebab. <br />
              <br />
              I wanted my restaurant to be different. Not just a regular kebab
              restaurant, but something special. Something that would give my
              guests an experience they would never forget. I wanted to create a
              place where one could enjoy delicious food, great music, and
              laughter with friends. <br />
              <br />
              So I got to work and planned. I knew exactly what I wanted on the
              menu - all my childhood favorites, but with a modern twist. I
              wanted a welcoming atmosphere where one could feel at home. <br />
              <br />
              And now I'm proud to say that my dream has come true. Amos kebab
              is not just a restaurant - it's a place where I can share my
              passion for food with all of you. So welcome to Amos kebab. Come
              and experience my dream with me!
            </p>
          </div>
        </div>
        <div className="Video">
          <h3>My story</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qRFVleO3RzE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
