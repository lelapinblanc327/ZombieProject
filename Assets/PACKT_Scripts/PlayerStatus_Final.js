#pragma strict

var health : int = 7;
var healthLimit : int = 10;

function AddHealth (increase : int)
{
	health += increase;
	
	if (health > healthLimit)
	{
		health = healthLimit; 
	}

}

function AddDamage (damage : int)
{	
	health-=damage;

	if (health <= 0)
	{
		health = 0;
		Die();
	}
}

function Die()
{
	Debug.Log("You Died");
}

