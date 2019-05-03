---
title: Treading Lightly in the Encryption Minefield
layout: post
date: 2019-05-03 8:38
categories:
    - Laravel
excerpt: "A horror story, plus tips for using Laravel's encryption functionality"
image: assets/img/2019-05-03-cryptography.jpg
image_caption: autor de la página [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)
---

Perhaps you've been there. You navigate to your website and log in. Then your heart falls through the floor as you realize everything that's coming from the database is showing up as a garbled mess of Base64 characters. (You know it's Base64 thanks to the [tell-tale equals signs](https://en.wikipedia.org/wiki/Base64#Decoding_Base64_with_padding) at the end of each string.)

Maybe you meant to, maybe you didn't, but you encrypted some data in your database, and your application is failing to decrypt it.

This happened to me not too long ago. Let me tell you how I fixed it, and I'll share some strategies I've learned for managing data security.

## Encryption is not a toy.

The purpose of encryption is to obscure a message in such a way that only the intended recipient is able to read it. Modern encryption algorithms achieve this through the use of two keys. The public key is a (really big) number that is published for everyone to see. It's used to encrypt the message&mdash;to turn it into the jumbled mess known as the *ciphertext*. The second key is the private key, which is (another) really big number that only the author and the recipient of the message possess. It's used to decrypt the ciphertext and turn it back into the legible original message.

Modern encryption algorithms aren't *technically* perfect&mdash;they can by cracked if given enough time&mdash;but they are *effectively* perfect, as the time required to crack them with the best technology and resources available is longer than the age of the universe. (Before long, [quantum computers will render these algorithms much less secure](https://youtu.be/lvTqbM5Dq4Q), but that's another story.)

But the strength of modern encryption is a double-edged sword if you're a dummy like me who doesn't know what he's doing. &#x1F609; Because if you encrypt some text in a database and then lose the private key, you (or, more precisely, your application) can't decrypt it. And then all you're left with is the jumbled mess, the ciphertext. The original message is lost forever.

Luckily, I was able to recover my encrypted data, thanks to my high-tech hacking skills and a strategy I call Finding The Private Key Because That Really Is The Only Way To Fix This Problem.

## Laravel's default encryption

Laravel ships with sophisticated encryption capabilities, but by default only [cookies](https://laravel.com/docs/5.8/responses#cookies-and-encryption) are encrypted. It's up to you whether you wish any other data to be encrypted&mdash;such as user session data stored in memory on the server running your application, or data stored a database.

Laravel uses the APP_KEY environmental variable as a private key for decrypting encrypted data. This means that an application's APP_KEY is (A) very important and (B) very sensitive. You should NOT commit it to version control. I repeat (and I'm speaking to myself here): DO NOT commit the APP_KEY to git.

## Ungarbling the garbled

Except that's exactly what I did a few months ago. I inadvertently committed a file to my application's repository that contained the APP_KEY. So I decided (rightly) that it was time to change the APP_KEY.

Laravel makes it very easy to do this. Simply run `php artisan key:generate` in the console. Done. And that's when everything broke. because prior to inadvertiently committing the APP_KEY to git, I had inadvertently (and unknowingly) committed another change that encrypted some of the data on the database.

Encrypting some of the user data on the database is something I had considered for a while, but ultimately decided not to implement at the time. Unfortunately, I inadvertently (and unknowlingly) merged that code into my master branch and pushed it to the repo.

Laravel makes encrypting and decrypting data so easy that I didn't even notice I had done this. That is, until I had changed the APP_KEY. With a different private key, my application was unable to decrypt the data on the database, which means it rendered the ciphertext right there on the page, in all its Base64 glory.

Ironically, my first mistake ended up saving me. Because I had pushed my APP_KEY to git, I was able to look back and retrieve it. I reverted the APP_KEY back to its old value, ran a script that decrypted the database, and then changed it back again using the same `key:generate` artisan command as before. Now it didn't matter that the key had changed, because my data wasn't encrypted in the first place. Problem solved.

## Final tips

Ideally, this is a lesson I would have preferred to learn *before* breaking my app on production so spectacularly. While it's too late for me, I hope you can benefit from this story and from these final tips for managing data security in a Laravel application:

- When you first create (or clone) a Laravel project, set the APP_KEY value using `php artisan key:generate`.

- Add the `.env` file (where the APP_KEY environment variable lives) to your `.gitignore` file so that it won't be added to your git repo.

- Change your APP_KEY regularly (maybe every six months), just to be safe.

- But **before** you change your APP_KEY, make a plan for decrypting all encrypted data with the old APP_KEY. The process should be:
    1. Decrypt all encrypted data with the old APP_KEY.
    1. Change the APP_KEY.
    1. Re-encrypt the data.
    
    (Of course this only applies if you have chosen to encrypt data to begin with.)
    
- Changing the APP_KEY will invalidate any current user sessions, so consider doing it at a time when it will affect the fewest number of users possible.