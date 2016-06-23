using UnityEngine;
using System.Collections;

public class FPSAnimation : MonoBehaviour {
	public Animator theAnimator;

	void Start () 
	{
		theAnimator = GetComponent<Animator>();
	}
	
	void Update () 
	{
		if(Input.GetButton ("Fire1"))
		{
			theAnimator.SetTrigger ("Shooting");
			Shoot();
		}
	}
	void Shoot ()
	{

	}
}
