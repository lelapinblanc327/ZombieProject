using UnityEngine;
using System.Collections;

public class PlayerStatus_Final : MonoBehaviour {
	public int health = 7;
	public int healthLimit = 10;

	void AddHealth(int increase)
	{
		health += increase;

		if(health > healthLimit)
		{
			health = healthLimit;
		}
	}

	void AddDamage(int damage)
	{
		health -= damage;
		if(health <= 0)
		{
			health = 0;
			Die();
		}
	}

	void Die()
	{
		Debug.Log("You Died");
	}
}
